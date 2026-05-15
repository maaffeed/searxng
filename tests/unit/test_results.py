# SPDX-License-Identifier: AGPL-3.0-or-later
# pylint: disable=missing-module-docstring,disable=missing-class-docstring,invalid-name

import unittest

from searx.result_types import LegacyResult
from searx.result_types._base import _is_email_address, _normalize_url_fields
from searx.results import ResultContainer
from tests import SearxTestCase


class EmailUrlNormalizationTestCase(unittest.TestCase):
    """Tests that bare email addresses in result URL fields are handled correctly.

    Without the fix a bare address like "user@example.com" was converted to
    the malformed URL "http:///user@example.com" (no authority), which
    produced broken links and incorrect URL hashing across all engines.
    """

    def _make_legacy_result(self, url):
        r = LegacyResult({"url": url, "title": "t", "content": "c"})
        _normalize_url_fields(r)
        return r

    # --- _is_email_address -------------------------------------------------

    def test_bare_email_detected(self):
        self.assertTrue(_is_email_address("user@example.com"))

    def test_bare_email_with_plus(self):
        self.assertTrue(_is_email_address("user+tag@example.com"))

    def test_mailto_not_detected_as_bare(self):
        self.assertFalse(_is_email_address("mailto:user@example.com"))

    def test_http_auth_url_not_detected(self):
        self.assertFalse(_is_email_address("http://user@example.com/"))

    def test_regular_url_not_detected(self):
        self.assertFalse(_is_email_address("https://example.com"))

    def test_email_in_query_not_detected(self):
        self.assertFalse(_is_email_address("https://example.com/?to=user@example.com"))

    # --- _normalize_url_fields (via LegacyResult) --------------------------

    def test_bare_email_becomes_mailto(self):
        r = self._make_legacy_result("user@example.com")
        self.assertEqual(r.url, "mailto:user@example.com")

    def test_bare_email_parsed_url_is_well_formed(self):
        r = self._make_legacy_result("user@example.com")
        # Must not be None so __hash__ doesn't raise ValueError
        self.assertIsNotNone(r.parsed_url)
        self.assertEqual(r.parsed_url.scheme, "mailto")

    def test_bare_email_url_contains_no_triple_slash(self):
        r = self._make_legacy_result("user@example.com")
        # The old code produced "http:///user@example.com" – make sure that's gone
        self.assertNotIn("http://", r.url)
        self.assertNotIn("http:", r.url.replace("mailto:", ""))

    def test_existing_mailto_url_unchanged(self):
        r = self._make_legacy_result("mailto:user@example.com")
        self.assertEqual(r.url, "mailto:user@example.com")

    def test_normal_http_url_unchanged(self):
        r = self._make_legacy_result("https://example.com/page")
        self.assertEqual(r.url, "https://example.com/page")

    def test_http_auth_url_preserved(self):
        r = self._make_legacy_result("http://user@example.com/path")
        self.assertEqual(r.url, "http://user@example.com/path")

    def test_bare_email_result_is_hashable(self):
        r = self._make_legacy_result("user@example.com")
        # Must not raise ValueError
        h = hash(r)
        self.assertIsInstance(h, int)

class ResultContainerTestCase(SearxTestCase):
    # pylint: disable=use-dict-literal

    TEST_SETTINGS = "test_result_container.yml"

    def test_empty(self):
        container = ResultContainer()
        self.assertEqual(container.get_ordered_results(), [])

    def test_one_result(self):
        result = dict(url="https://example.org", title="title ..", content="Lorem ..")

        container = ResultContainer()
        container.extend("google", [result])
        container.close()

        self.assertEqual(len(container.get_ordered_results()), 1)

        res = LegacyResult(result)
        res.normalize_result_fields()
        self.assertIn(res, container.get_ordered_results())

    def test_one_suggestion(self):
        result = dict(suggestion="lorem ipsum ..")

        container = ResultContainer()
        container.extend("duckduckgo", [result])
        container.close()

        self.assertEqual(len(container.get_ordered_results()), 0)
        self.assertEqual(len(container.suggestions), 1)
        self.assertIn(result["suggestion"], container.suggestions)

    def test_email_url_results_are_merged(self):
        """Same bare email address returned by two engines must merge to one result."""
        container = ResultContainer()
        container.extend("eng1", [{"url": "user@example.com", "title": "a", "content": "x"}])
        container.extend("eng2", [{"url": "user@example.com", "title": "a", "content": "x"}])
        container.close()
        self.assertEqual(len(container.get_ordered_results()), 1)

    def test_merge_url_result(self):
        # from the merge of eng1 and eng2 we expect this result
        result = LegacyResult(
            url="https://example.org", title="very long title, lorem ipsum", content="Lorem ipsum dolor sit amet .."
        )
        result.normalize_result_fields()
        eng1 = dict(url=result.url, title="short title", content=result.content, engine="google")
        eng2 = dict(url="http://example.org", title=result.title, content="lorem ipsum", engine="duckduckgo")

        container = ResultContainer()
        container.extend(None, [eng1, eng2])
        container.close()

        result_list = container.get_ordered_results()
        self.assertEqual(len(container.get_ordered_results()), 1)
        self.assertIn(result, result_list)
        self.assertEqual(result_list[0].title, result.title)
        self.assertEqual(result_list[0].content, result.content)

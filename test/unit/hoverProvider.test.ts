import * as assert from 'assert';
import { clearArchCache, clearArchCacheFor } from '../../src/providers/archCache';

describe('hoverProvider cache helpers', () => {
  it('clearArchCache does not throw on empty cache', () => {
    assert.doesNotThrow(() => clearArchCache());
  });

  it('clearArchCacheFor does not throw on empty cache', () => {
    assert.doesNotThrow(() => clearArchCacheFor('file:///some/file.lst'));
  });

  it('clearArchCache does not throw when called multiple times', () => {
    assert.doesNotThrow(() => {
      clearArchCache();
      clearArchCache();
    });
  });

  it('clearArchCacheFor does not throw for unknown key', () => {
    assert.doesNotThrow(() => clearArchCacheFor('file:///nonexistent.lst'));
  });
});

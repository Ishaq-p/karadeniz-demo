/**
 * Cursor ortamındaki window.storage API'sini localStorage ile taklit eder.
 * Tarayıcıda siparişlerin kaydedilmesi ve okunması için gereklidir.
 */
if (!window.storage) {
  window.storage = {
    /**
     * localStorage'dan değer okur.
     * @param {string} key - Okunacak anahtar
     * @param {boolean} _shared - Cursor API uyumluluğu (kullanılmaz)
     * @returns {Promise<{ value: string | null }>}
     */
    async get(key, _shared) {
      return { value: localStorage.getItem(key) };
    },

    /**
     * localStorage'a değer yazar.
     * @param {string} key - Yazılacak anahtar
     * @param {string} value - Kaydedilecek değer
     * @param {boolean} _shared - Cursor API uyumluluğu (kullanılmaz)
     * @returns {Promise<void>}
     */
    async set(key, value, _shared) {
      localStorage.setItem(key, value);
    },
  };
}

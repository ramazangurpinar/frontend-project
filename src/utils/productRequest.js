
/**
 * Product Types.
 * @typedef {'Headphone' | 'Keyboard'} ProductType
 */

/**
 * Common product fields.
 * @typedef {Object} Common
 * @property {ProductType} productType
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} imageFileName
 * @property {boolean} wireless
 * @property {string} weight
 */

/**
 * Headphone spesific fields.
 * @typedef {Object} HeadphoneSpecific
 * @property {string} [manufacturer]
 * @property {string} [batteryLife]
 * @property {string} [noiseCancellationType]
 * @property {boolean} [mic]
 */

/**
 * Keyboard spesific fields.
 * @typedef {Object} KeyboardSpecific
 * @property {boolean} [isMechanical]
 */

/**
 * Registry öğesi tipi.
 * @typedef {Object} RegistryEntry
 * @property {string} endpoint
 * @property {(base: Omit<Common,'productType'>, specific?: Record<string, any>) => Record<string, any>} toPayload
 */

/**
 * buildProductRequest dönüş tipi.
 * @typedef {Object} BuildProductRequestResult
 * @property {string} endpoint
 * @property {Record<string, any>} payload
 */

// Common fields
/** @type {Array<keyof Common>} */
const COMMON_KEYS = [
  "productType",
  "name",
  "description",
  "price",
  "imageFileName",
  "wireless",
  "weight",
];

// Helper
/**
 * Choose common fields
 * @param {Partial<Common>} common
 * @returns {Partial<Common>}
 */
function pickCommon(common) {
  const out = {};
  for (const k of COMMON_KEYS) out[k] = common?.[k];
  return out;
}

// Registry

/** @type {Record<ProductType, RegistryEntry>} */
const REGISTRY = {
  Headphone: {
    endpoint: "/Headphones",
    /**
     * @param {Omit<Common,'productType'>} base
     * @param {HeadphoneSpecific} [specific={}]
     */
    toPayload(base, specific = {}) {
      const { productType, ...common } = base;
      const {
        manufacturer = "",
        batteryLife = "",
        noiseCancellationType = "",
        mic = false,
      } = specific;
      return { ...common, manufacturer, batteryLife, noiseCancellationType, mic };
    },
  },
  Keyboard: {
    endpoint: "/Keyboards",
    /**
     * @param {Omit<Common,'productType'>} base
     * @param {KeyboardSpecific} [specific={}]
     */
    toPayload(base, specific = {}) {
      const { productType, ...common } = base;
      const { isMechanical = false } = specific;
      return { ...common, isMechanical };
    },
  },
};


/**
 * TPH.
 * change behaviour in case of type.
 * @param {Partial<Common>} common
 * @param {Record<string, any>} [specific]
 * @returns {BuildProductRequestResult}
 */
export function buildProductRequest(common, specific) {
  const type = common?.productType;
  const def = REGISTRY[type];
  if (!def) throw new Error(`Unsupported productType: ${type}`);

  const base = pickCommon(common);
  return {
    endpoint: def.endpoint,
    payload: def.toPayload(base, specific),
  };
}

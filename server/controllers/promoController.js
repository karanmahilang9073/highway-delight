// This object acts as our "database" of valid promo codes
const validCodes = {
  "SAVE10": { type: "percentage", value: 10 },
  "FLAT100": { type: "flat", value: 100 }
};

export const validatePromoCode = (req, res) => {
  // 1. Get the code from the request body
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: "No promo code provided" });
  }

  // 2. Check if the code exists (we'll make it case-insensitive)
  const promo = validCodes[code.toUpperCase()];

  if (promo) {
    // 3. Success! Send back the discount details
    res.status(200).json({
      success: true,
      code: code.toUpperCase(),
      discountType: promo.type,
      discountValue: promo.value
    });
  } else {
    // 4. Failure. Send an error message.
    res.status(404).json({ success: false, message: "Invalid promo code" });
  }
};
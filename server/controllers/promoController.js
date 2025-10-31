const validCodes = {
  "SAVE10": { type: "percentage", value: 10 },
  "FLAT100": { type: "flat", value: 100 }
};

export const validatePromoCode = (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: "No promo code provided" });
  }
  //  Check if the code exists 
  const promo = validCodes[code.toUpperCase()];

  if (promo) {
    res.status(200).json({success: true,code: code.toUpperCase(),discountType: promo.type,discountValue: promo.value});
  } else {
    
    res.status(404).json({ success: false, message: "Invalid promo code" });
  }
};
// CineSeat / Server / controllers / adminController.js

/* -------- CHECK IF USER IS ADMIN -------- */
export const isAdmin = async (req, res) => {
  return res.status(200).json({ success: true, isAdmin: true });
};

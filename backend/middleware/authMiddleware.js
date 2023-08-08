import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  /* --> (JWT(3))

Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJpZCI6IjYyZDhmMDgzNzExMjY2OWU3NWN
hOGU1YSIsImlhdCI6MTY1ODY4MTE1OSwiZXh
wIjoxNjYxMjczMTU5fQ.Gj1nVkL2hXFBl93V
eSkQO6Utiov2bc53hynyWCarTvI

උදාහරණයක් ලෙස ගත් කල JWT token එක ඉහත ආකාරය 
ගන්නා අතර 
*/

  if (
    /* මෙමගින් headers හි authorization තුල JWT එක පවතීද 
    හා එය startsWith("Bearer")  දැයි බලයි*/
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      /*මෙහිදී Bearer කෑල්ල අයින් කර token එක පමණක් ගනී */
      token = req.headers.authorization.split(" ")[1];

      /*මෙහිදී JWT_SECRET මගින් token එක decrypt කර ගනී*/
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      /*
        JWT token  එක decrypt කල විට එහි කොටස් 3 කි
        {
        "id": "62d8f0837112669e75ca8e5a",
        "iat": 1658682454,
        "exp": 1661274454
        } 
        
         මෙහිදී පලමු කොටසෙන් අපිට encrypt කරපුදෙ dycrypt වී ලැබෙ.
         එමනිසා එම id එක (මෙහිදී අපි encrypt කලෙ  user id එක බැවින්)
         මගින් එම id එකට අදාල userව සොයා එය req.user තුල
         save කරයි 
        */
      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      //console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  //req.user එකක් තිබෙද හා එම user admin කෙනෙක්ද කියා මෙහිදී බලයි
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };

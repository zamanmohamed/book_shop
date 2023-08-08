import jwt from "jsonwebtoken";

/* මෙහිදී generateToken function එකට අපිට කැමති id  එකක් pass කර 
එය JWT_SECRET මගින් encrypt කර token  එකක් සාදයො. expiresIn මගින්
සාදන token  එකෙහි වලංගු කාලය අපට දිය හැක (මෙහිදී දින 30යි) --> (JWT(1)) */

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;

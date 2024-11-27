import { PrismaClient } from "@prisma/client";
import axios from "axios";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config/config";

const prisma = new PrismaClient();

// const scopeLogin

const loginGoogle = async (token: string) => {
	const userInfo = await axios.get(
		`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	console.log("DEBUGG!");
	console.log(userInfo);
	console.log("DEBUGG!");

	const existingUser = await prisma.user.findUnique({
		where: {
			Email: userInfo.data.email,
		},
	});

	let newUser;
	if (existingUser) {
		console.log("User already exists:", existingUser);
		newUser = existingUser;
	} else {
		console.log("User does not exist, creating new user...");
		newUser = await prisma.user.create({
			data: {
				Name: userInfo.data.name,
				Email: userInfo.data.email,
				ProfilePicture: userInfo.data.picture,
				Password: "",
				Age: 0,
				Role: "USER",
			},
		});
		console.log("New user created:", newUser);
	}

	const secretKey = JWT_SECRET;

	const tokenPayload = {
		id: existingUser ? existingUser.UserId : newUser.UserId,
		email: existingUser ? existingUser.Email : newUser.Email,
		role: existingUser ? existingUser.Role : newUser.Role,
	};

	const jwtToken = jwt.sign(tokenPayload, secretKey || "", { expiresIn: "1h" });

	console.log("Generated JWT token:", jwtToken);

	return jwtToken;
}

const userToken =
	"ya29.a0AeDClZCR4HQvJ2el8YqBjETKxn64XVJzImQpQsFhxzeAssHBYgL005Yp_Pw-vTwROvXUReDTM4OysauDIPmpSxupTvvBhhCw__mbfsxZZkMHLUzdUbGmK13bDSmfkOt_xH0uvo5_qOT_EFvBGqRyNHdBmUuYLyD6AtIaCgYKAccSARISFQHGX2Mils3zkBGTepNa1rVuI9ungg0170";

loginGoogle(userToken);

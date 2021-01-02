import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { facebookSignin, facebookKey } from "./api-auth";
import { useFetch, usePost } from "../hook/useFetch";
import { FacebookButton } from "../components/Buttons/Buttons";

const Facebook = ({ submitSocial, text }) => {
	const [key, message] = useFetch(facebookKey);

	const responseFacebook = async (response) =>
		submitSocial(facebookSignin, {
			userID: response.userID,
			accessToken: response.accessToken,
		});

	if (!key) {
		return <div></div>;
	}

	return (
		<FacebookLogin
			appId={key.api}
			autoLoad={false}
			render={(renderProps) => (
				<FacebookButton click={renderProps.onClick} text={text} />
			)}
			callback={responseFacebook}
		/>
	);
};

export default Facebook;

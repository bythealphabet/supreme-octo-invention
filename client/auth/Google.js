import React, { useState, useEffect } from "react";
import GoogleLogin from "react-google-login";
import { googleSignin, googleKey } from "./api-auth";
import { useFetch } from "../hook/useFetch";

import { GoogleButton } from "../components/Buttons/Buttons";

const Google = ({ submitSocial, text }) => {
	const [key, message] = useFetch(googleKey);

	async function responseGoogle(response) {
		submitSocial(googleSignin, { idToken: response.tokenId });
	}

	if (!key) {
		return <div></div>
	}

	return (
		<GoogleLogin
			clientId={key.api}
			render={(renderProps) => (
				<GoogleButton
					click={renderProps.onClick}
					disabled={renderProps.disabled}
					text={text}
				/>
			)}
			buttonText="Login with Google"
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={"single_host_origin"}
		/>
	);
};

export default Google;

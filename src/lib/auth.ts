import {
  StartOAuthFlowParams,
  StartOAuthFlowReturnType,
} from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { fetchAPI } from "./fetch";

export const googleOAuth = async (
  startOAuthFlow: (
    startOAuthFlowParams?: StartOAuthFlowParams | undefined,
  ) => Promise<StartOAuthFlowReturnType>,
) => {
  try {
    const { createdSessionId, signUp, signIn, setActive, authSessionResult } =
      await startOAuthFlow();

    if (createdSessionId) {
      if (setActive) await setActive({ session: createdSessionId });

      if (signUp?.createdSessionId) {
        await fetchAPI("/(api)/users", {
          method: "POST",
          body: JSON.stringify({
            name: `${signUp.firstName} ${signUp.lastName}`,
            email: signUp.emailAddress,
            clerkId: signUp.createdUserId,
          }),
        });
      }

      return {
        success: true,
        code: "success",
        message: "You have successfully authenticated",
      };
    }

    return {
      success: false,
      code: "error",
      message: "Something went wrong",
    };
  } catch (error: any) {
    return {
      success: false,
      code: "error",
      message: error?.errors[0]?.longMessage as string,
    };
  }
};

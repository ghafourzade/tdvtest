let verifyWaiting = false;
export const sendVerifyCode = async ({ mobileNum }) => {
  if (!verifyWaiting) {
    mobileNum = mobileNum ? mobileNum : null;
    if (mobileNum) {
      verifyWaiting = true;
      const api = `https://tdv.lifeschoolclinic.com/api/sendcode?mobileno=${mobileNum}`;
      const result = await fetch(api, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTimeout(() => {
        verifyWaiting = false;
      }, 10000);
      return result;
    } else {
      throw "Can't find phone mobile number (mobileNum) .";
    }
  } else {
    throw "Verify waiting .";
  }
};

export const enterVerifyCode = async ({ verifyCode }) => {
  verifyCode = verifyCode ? verifyCode : null;
  if (verifyCode) {
    const api = `https://tdv.lifeschoolclinic.com/api/verifycode?code=${verifyCode}`;
    const result = await fetch(api, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result.json();
  } else {
    throw "Verify code is empty (verifyCode) .";
  }
};

export const getUser = async () => {
  const api = `https://tdv.lifeschoolclinic.com/api/user`;
  const result = await fetch(api, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result.json();
};

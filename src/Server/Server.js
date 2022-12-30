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
      throw new Error("Can't find phone mobile number (mobileNum) .");
    }
  } else {
    throw new Error("Verify waiting .");
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
    throw new Error("Verify code is empty (verifyCode) .");
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
  return result;
};

export const getUserInfo = async ({ userId }) => {
  const api = `https://tdv.lifeschoolclinic.com/api/userinfo?userid=${userId}`;
  const result = await fetch(api, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

export const setProfileData = async ({ userName, gender, age, profilePicBase64Code }) => {
  const api = `https://tdv.lifeschoolclinic.com/api/setuser`;
  const data = {};
  data["UserName"] = userName;
  data["Gender"] = gender;
  data["old"] = age;
  if (profilePicBase64Code) data["Image"] = profilePicBase64Code;
  if (profilePicBase64Code === false) data["Image"] = "";

  const result = await fetch(api, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return result.text();
};

export const logout = async () => {
  const api = `https://tdv.lifeschoolclinic.com/api/logout`;
  const result = await fetch(api, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
};

const fetchStaticData = async ({ fileName }) => {
  const api = `https://tdv.lifeschoolclinic.com/StaticData/${fileName}`;
  const result = await fetch(api, {
    method: "GET",
  });
  return result.json();
};

const getApi = async ({ api }) => {
  const url = `https://tdv.lifeschoolclinic.com/api/${api}`;
  const result = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonResult = await result.json();
  try {
    const jsonArray = JSON.parse(jsonResult);
    if (typeof jsonArray !== "object") return [];
    return jsonArray;
  } catch (erroe) {
    return [];
  }
};

const postApi = async ({ api, bodyObj }) => {
  const url = `https://tdv.lifeschoolclinic.com/api/${api}`;
  const data = JSON.stringify(bodyObj);
  const result = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
  return result;
};

export const fetchLoveQuestionsJson = async () => {
  const fileName = "LoveQuestions.json";
  return await fetchStaticData({ fileName });
};

export const fetchTalentQuestionsJson = async () => {
  const fileName = "TalentQuestions.json";
  return await fetchStaticData({ fileName });
};

export const fetchValueQuestionsJson = async () => {
  const fileName = "ValueQuestions.json";
  return await fetchStaticData({ fileName });
};

export const loadLoveResult = async () => {
  const api = "LoadLoveResult";
  return await getApi({ api });
};

export const loadValueResult = async () => {
  const api = "LoadValueResult";
  return await getApi({ api });
};

export const loadTalentResult = async () => {
  const api = "LoadTalentResult";
  return await getApi({ api });
};

export const saveLoveResult = async ({ bodyObj }) => {
  const api = "SaveLoveResult";
  return await postApi({ api, bodyObj });
};

export const saveValueResult = async ({ bodyObj }) => {
  const api = "SaveValueResult";
  return await postApi({ api, bodyObj });
};

export const saveTalentResult = async ({ bodyObj }) => {
  const api = "SaveTalentResult";
  return await postApi({ api, bodyObj });
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const loadTalentJM1Result = async ({ userId }) => {
  const api = "LoadTalentJM1Result?userid=" + userId;
  return await getApi({ api });
};
export const loadTalentJM2Result = async ({ userId }) => {
  const api = "LoadTalentJM2Result?userid=" + userId;
  return await getApi({ api });
};
export const loadTalentJM3Result = async ({ userId }) => {
  const api = "LoadTalentJM3Result?userid=" + userId;
  return await getApi({ api });
};
export const saveTalentJM1Result = async ({ userId, bodyObj }) => {
  const api = "SaveTalentJM1Result?userid=" + userId;
  return await postApi({ api, bodyObj });
};
export const saveTalentJM2Result = async ({ userId, bodyObj }) => {
  const api = "SaveTalentJM2Result?userid=" + userId;
  return await postApi({ api, bodyObj });
};
export const saveTalentJM3Result = async ({ userId, bodyObj }) => {
  const api = "SaveTalentJM3Result?userid=" + userId;
  return await postApi({ api, bodyObj });
};

const jm = {
  loadTalentJM1Result,
  loadTalentJM2Result,
  loadTalentJM3Result,
  saveTalentJM1Result,
  saveTalentJM2Result,
  saveTalentJM3Result,
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const server = {
  sendVerifyCode,
  enterVerifyCode,
  getUser,
  setProfileData,
  logout,
  fetchLoveQuestionsJson,
  fetchTalentQuestionsJson,
  fetchValueQuestionsJson,
  loadLoveResult,
  loadValueResult,
  loadTalentResult,
  saveLoveResult,
  saveValueResult,
  saveTalentResult,
  jm,
};

export default server;

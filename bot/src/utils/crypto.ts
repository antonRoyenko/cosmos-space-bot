import {
  randomBytes,
  createHash,
  createCipheriv,
  createDecipheriv,
} from "crypto";
const algorithm = "aes-256-cbc";

export function encrypt(text: string, key: string) {
  const iv = randomBytes(16);
  const hash = getPasswordHash(key);
  const cipher = createCipheriv(algorithm, hash, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

export function decrypt(
  text: {
    iv: string;
    encryptedData: string;
  },
  key: string
) {
  try {
    const hash = getPasswordHash(key);
    const decipher = createDecipheriv(algorithm, hash, text.iv);
    const buffer = Buffer.from(text.encryptedData, "base64").toString("hex");
    const firstPart = decipher.update(buffer, "hex", "base64");
    console.log(1, firstPart);
    const finalPart = decipher.final("base64") || "";
    console.log(2, finalPart);
    const decrypted = `${firstPart}${finalPart}`;
    const buf = Buffer.from(decrypted, "base64");
    return buf.toString("utf8");
  } catch (e) {
    console.log(e);
    return "Something went wrong. Please contact me @ReactiveGuy";
  }

  // const hash = getPasswordHash(key);
  // const iv = Buffer.from(text.iv, "hex");
  // const encryptedText = Buffer.from(text.encryptedData, "hex");
  // const decipher = createDecipheriv(algorithm, hash, iv);
  // decipher.setAutoPadding(false);
  // let decrypted = decipher.update(encryptedText);
  // try {
  // decrypted = Buffer.concat([decrypted, decipher.final()]);
  // return decrypted.toString();
  // }
}

function getPasswordHash(password: string) {
  return createHash("sha256")
    .update(String(password))
    .digest("base64")
    .substr(0, 32);
}

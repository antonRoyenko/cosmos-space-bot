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
    const iv = Buffer.from(text.iv, "hex");
    const encryptedText = Buffer.from(text.encryptedData, "hex");
    const decipher = createDecipheriv(algorithm, hash, iv);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const buffer = Buffer.from(encryptedText, "base64").toString("hex");
    const firstPart = decipher.update(buffer, "hex", "base64");
    const finalPart = decipher.final("base64") || "";
    const decrypted = `${firstPart}${finalPart}`;
    const buf = Buffer.from(decrypted, "base64");
    return buf.toString("utf8");
  } catch (e) {
    console.log(e);
    return "If you see this error, just remove current wallet and re-add it";
  }
}

function getPasswordHash(password: string) {
  return createHash("sha256")
    .update(String(password))
    .digest("base64")
    .substr(0, 32);
}

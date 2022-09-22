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
  const hash = getPasswordHash(key);
  const iv = Buffer.from(text.iv, "hex");
  const encryptedText = Buffer.from(text.encryptedData, "hex");

  try {
    const decipher = createDecipheriv(algorithm, hash, iv);
    let decrypted = decipher.update(encryptedText);
    console.log(1);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    console.log(2);
    return decrypted.toString();
  } catch (e) {
    console.log("Decrypt error: " + e);
    const decipher = createDecipheriv(algorithm, hash, iv);
    decipher.setAutoPadding(false);
    let decrypted = decipher.update(encryptedText);
    console.log(3);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    console.log(4);
    return decrypted.toString();
  }
}

function getPasswordHash(password: string) {
  return createHash("sha256")
    .update(String(password))
    .digest("base64")
    .substr(0, 32);
}

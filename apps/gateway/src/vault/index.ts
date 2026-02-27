import crypto fromcrypto;
const algorithm = aes-256-gcm;
const key = (()=>{ const k=process.env.VAULT_KEY||01234567890123456789012345678901; return Buffer.from(k); })();
export const encrypt = (plaintext:string)=>{ const iv = crypto.randomBytes(12); const cipher = crypto.createCipheriv(aes-256-gcm, key, iv); const enc = Buffer.concat([cipher.update(plaintext, utf8), cipher.final()]); const tag = cipher.getAuthTag(); return iv.toString(hex)+":"+enc.toString(hex)+":"+tag.toString(hex); };
export const decrypt = (token:string)=>{ const [ivHex, encHex, tagHex] = token.split(":"); const iv=Buffer.from(ivHex,hex); const enc=Buffer.from(encHex,hex); const tag=Buffer.from(tagHex,hex); const decipher = crypto.createDecipheriv(aes-256-gcm, key, iv); decipher.setAuthTag(tag); const dec = Buffer.concat([decipher.update(enc), decipher.final()]); return dec.toString(utf8); };

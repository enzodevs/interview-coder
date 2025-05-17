import Store from "electron-store"
import fs from "fs"
import path from "path"
import { app } from "electron"
import { randomBytes } from "crypto"

interface StoreSchema {
  // Empty for now, we can add other store items here later
}

// Function to get or create encryption key
function getEncryptionKey(): string {
  const keyPath = path.join(app.getPath('userData'), '.encryption-key')
  
  // If the key file exists, read it
  if (fs.existsSync(keyPath)) {
    try {
      return fs.readFileSync(keyPath, 'utf8').trim()
    } catch (error) {
      console.error('Error reading encryption key:', error)
      // If there's an error reading the key, generate a new one
    }
  }
  
  // Generate a new random key
  const newKey = randomBytes(32).toString('hex')
  
  // Save the key to the file
  try {
    fs.writeFileSync(keyPath, newKey, { mode: 0o600 }) // Restrictive permissions
    console.log('New encryption key generated and saved')
  } catch (error) {
    console.error('Error saving encryption key:', error)
  }
  
  return newKey
}

const store = new Store<StoreSchema>({
  defaults: {},
  encryptionKey: getEncryptionKey()
}) as Store<StoreSchema> & {
  store: StoreSchema
  get: <K extends keyof StoreSchema>(key: K) => StoreSchema[K]
  set: <K extends keyof StoreSchema>(key: K, value: StoreSchema[K]) => void
}

export { store }

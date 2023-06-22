import axios from 'axios'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const storage = getStorage()

export const uploadImage = async (formData) => {
  let data = await axios.post('http://pballu.com:5000/upload', formData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
  return data
}

export const uploadImageFirebase = async (file) => {
  const storageRef = ref(
    storage,
    `https://firebasestorage.googleapis.com/v0/b/chat-99a52.appspot.com/o/${
      file.name
    }_${new Date().getTime()}`,
  )
  let data = await uploadBytes(storageRef, file)
  return await getDownloadURL(data.ref)
}

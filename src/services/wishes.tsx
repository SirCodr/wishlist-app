export async function getAllWishes() {
  return await fetch('http://localhost:3000/wishes').then(res => res.json())
}
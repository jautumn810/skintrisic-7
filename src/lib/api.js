const PHASE_ONE = "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne";
const PHASE_TWO = "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export async function postPhaseOne(payload) {
  const res = await fetch(PHASE_ONE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Phase 1 API failed (${res.status}): ${text}`);
  }
  return res.json();
}

export async function postPhaseTwo(payload) {
  console.log('postPhaseTwo called with payload keys:', Object.keys(payload))
  console.log('postPhaseTwo image field exists:', 'image' in payload)
  console.log('postPhaseTwo image value type:', typeof payload.image)
  console.log('postPhaseTwo image value length:', payload.image?.length)
  
  const res = await fetch(PHASE_TWO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error('API Error Response:', text)
    throw new Error(`Phase 2 API failed (${res.status}): ${text}`);
  }
  
  const json = await res.json()
  console.log('postPhaseTwo API response:', JSON.stringify(json, null, 2))
  console.log('postPhaseTwo response message:', json?.message)
  console.log('postPhaseTwo response data exists:', !!json?.data)
  console.log('postPhaseTwo response data.race:', json?.data?.race)
  console.log('postPhaseTwo response data.age:', json?.data?.age)
  console.log('postPhaseTwo response data.gender:', json?.data?.gender)
  
  return json;
}

export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}


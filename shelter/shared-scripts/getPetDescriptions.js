async function getPetDescriptions(url) {
  try {
    const response = await fetch(url || 'assets/pets.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    return 'FAIL';
  }
}

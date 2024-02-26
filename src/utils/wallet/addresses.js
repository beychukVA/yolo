export const isAddressesEqual = (address1, address2) => {
  if (!address1) return false
  if (!address2) return false
  return address1.toLowerCase() === address2.toLowerCase()
}

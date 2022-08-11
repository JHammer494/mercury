const formatTailNumber = (id) => {
  const tn = id.toString().padStart(6, '0')
  return tn.slice(0, 2) + '-' + tn.slice(2)
}

export default formatTailNumber

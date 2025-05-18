const formatters = () => {
  const capitalizeWord = (str: string) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return { capitalizeWord }
}

export default formatters

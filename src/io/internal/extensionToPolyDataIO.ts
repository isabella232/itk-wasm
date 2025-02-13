const extensionToIO = new Map([
  ['gen', 'VTKExodusFileReader'],
  ['e', 'VTKExodusFileReader'],
  ['exo', 'VTKExodusFileReader'],
  ['exii', 'VTKExodusFileReader'],
  ['ex2', 'VTKExodusFileReader'],
  ['vtk', 'VTKLegacyFileReader'],
  ['VTK', 'VTKLegacyFileReader'],
  ['vtp', 'VTKXMLFileReader'],
  ['VTP', 'VTKXMLFileReader'],
  ['vtu', 'VTKXMLFileReader'],
  ['VTU', 'VTKXMLFileReader'],
  ['vtr', 'VTKXMLFileReader'],
  ['VTR', 'VTKXMLFileReader'],
  ['ply', 'VTKPLYFileReader'],
  ['PLY', 'VTKPLYFileReader']
])

export default extensionToIO

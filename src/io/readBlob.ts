import readImageBlob from './readImageBlob.js'
import readMeshBlob from './readMeshBlob.js'

import getFileExtension from './getFileExtension.js'
import extensionToMeshIO from './internal/extensionToMeshIO.js'
import mimeToMeshIO from './internal/MimeToMeshIO.js'

import ReadImageResult from './ReadImageResult.js'
import ReadMeshResult from './ReadMeshResult.js'
import ReadPolyDataResult from './ReadPolyDataResult.js'

async function readBlob (webWorker: Worker | null, blob: Blob, fileName: string, mimeType: string): Promise<ReadImageResult | ReadMeshResult | ReadPolyDataResult> {
  const extension = getFileExtension(fileName)
  const isMesh = !!extensionToMeshIO.has(extension) || !!mimeToMeshIO.has(mimeType)
  if (isMesh) {
    return await readMeshBlob(webWorker, blob, fileName, mimeType)
      .catch(async function () {
        if (webWorker !== null) {
          webWorker.terminate()
        }
        return await readImageBlob(null, blob, fileName, mimeType)
      })
  } else {
    return await readImageBlob(webWorker, blob, fileName, mimeType)
  }
}

export default readBlob

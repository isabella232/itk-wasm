/*=========================================================================
 *
 *  Copyright NumFOCUS
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *=========================================================================*/
#include "vtkJSONDataSetWriter.h"
#include "vtkPLYReader.h"
#include "vtkSmartPointer.h"
#include "vtkArchiver.h"

int main(int argc, char* argv[]) {
  if (argc < 3) {
    std::cerr << "Usage: " << argv[0] << " <inputFile> <outputPolyDataFile> "
              << std::endl;
    return EXIT_FAILURE;
  }
  const char* inputFile = argv[1];
  const char* outputPolyDataFile = argv[2];

  vtkSmartPointer<vtkPLYReader> plyReader =
      vtkSmartPointer<vtkPLYReader>::New();
  plyReader->SetFileName(inputFile);

  vtkNew<vtkArchiver> archiver;
  archiver->SetArchiveName(outputPolyDataFile);

  vtkNew<vtkJSONDataSetWriter> writer;
  writer->SetArchiver(archiver);
  writer->SetInputConnection(plyReader->GetOutputPort());

  try {
    writer->Update();
  } catch (const std::exception& error) {
    std::cerr << "Error: " << error.what() << std::endl;
    return EXIT_FAILURE;
  }

  return EXIT_SUCCESS;
}

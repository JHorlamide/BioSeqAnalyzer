## BioSeqAnalyzer A Simple Protein & DNA Sequence analyzer project.

## Protein:

Proteins, the building blocks of life, are large, complex molecules that play many critical roles in the body. For example hemoglobin is a protein that moves oxygen in your blood to your muscles. Other proteins such as lactase enzymes help us digest milk.

A protein is a linear chain of amino acids. There are 20 [standard amino acids.](https://www.cup.uni-muenchen.de/ch/compchem/tink/as.html)This "alphabet" lets us represent a protein as a sequence of discrete tokens. This is known as a protein's primary structure.

In protein engineering, the goal is to improve the property of a protein sequence by changing its amino acid sequence (primary structure) and measuring the property of different variants. The projects start with a “wild type” protein that has a given reference sequence. Then mutations to this sequence are introduced and their results on a given property of that protein are measured in a laboratory

## DNA Sequencing:

DNA sequencing is the process of determining the order of the nucleotides in a DNA molecule. The nucleotides are the building blocks of DNA, and their sequence encodes the genetic information that cells use to develop and operate. DNA sequencing is a powerful tool that is used in a variety of fields, including basic research, medical diagnostics, and forensic science.

Here is a more detailed explanation of DNA sequencing:

DNA is a double-stranded molecule, and the two strands are held together by complementary base pairs. The four bases in DNA are adenine (A), guanine (G), cytosine (C), and thymine (T). A pairs with T, and C pairs with G.

DNA sequencing methods typically work by breaking down the DNA molecule into smaller fragments and then determining the sequence of bases in each fragment. The fragments can be separated by size, and then the bases in each fragment can be identified using chemical or enzymatic methods.

Once the sequence of bases in each fragment is known, the sequence of the entire DNA molecule can be assembled by overlapping the fragments.

## Software Artchitecure:

![Alt text](./architecture.png)

## Requirements

To run this application, you will need:

* Docker installed on your machine
* A terminal or command prompt

## Installation

To install this application, follow these steps:

* Clone this repository to your machine: `git clone https://github.com/JHorlamide/BioSeqAnalyzer.git`
* Navigate to the project directory: `cd BioSeqAnalyzer`

## Running the Application

To start the application use docker compose:

* Navigate to the project directory: `cd infrastructure`
* `docker-compose up --build`
* To test the API endpoints, you can use a tool like [Postman](https://www.postman.com/downloads/) or [curl](https://curl.se/). For example, to create a new resource using `curl`, you can run the following command:

  * ```
    curl -X POST -H "Content-Type: application/json" -d '{ "name": "Growth", "description": "Scale the business" }' http://localhost:8080/api/phases
    ```

## Usage

#### Protein API Endpoints:

The API endpoints of the service are described below:

* `POST /api/protein-projects`: Create a new protein project.
* `GET /api/protein-projects`: Get all projects belonging to the authenticated user.
* `GET /api/protein-projects/:projectId:` Get projects by project ID
* `PUT /api/protein-projects/:projectId:` Update a projects details with the given project ID
* `DELETE /api/protein-projects/:projectId:` Delete a project with the given project ID
* `POST /api/protein-projects/:projectId/csv-upload:` Upload csv file for a project by the given project ID if no file as been uploaded using the.
* `GET /api/protein-projects/:projectId/summary-table-of-main-matrices:` Get summary of main matrices data from CSV.
* `GET /api/protein-projects/:projectId/top-performing-variants:` Get top performing variants data from CSV.
* `GET /api/protein-projects/:projectId/score-distribution:` Get top score distribution data from CSV.

#### DNA API Endpoints:

#### User API Endpoints:

## Running Test

To ensure the reliability and accuracy of the application, I have implemented a simple suite of tests. While these tests are not exhaustive, but they cover some critical aspects of the API implementation. To run the tests, use the following commands:

* To run the tests in watch mode, use the command `npm run test:watch`.
* To run the tests without watch mode, use the command `npm run test`.

I take application testing seriously and am committed to ensuring the highest possible quality of software :)

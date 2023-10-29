from Bio import Entrez
from pprint import pprint

Entrez.email = "olamide_jubril@outlook.com"
  
  
def get_sequence_record(sequence_id: str):
  handle = Entrez.efetch(db="nucleotide", id=sequence_id, rettype="gb", retmode="text")
  sequence = handle.read()
  handle.close()
  return sequence


def search_sequence(db: str, query_term: str):
  handle = Entrez.esearch(db=db, term=query_term, retmax="40")

  # Get the list of GenBank IDs
  genbank_ids = []
  for record in handle:
    genbank_ids.append(record["IdList"][0])

  # Close the Entrez handle
  handle.close()

  # Get the sequence data for each GenBank ID
  sequence_data = []
  for genbank_id in genbank_ids:
    sequence_handle = Entrez.efetch(db="nucleotide", id=genbank_id, rettype="fasta")
    sequence = sequence_handle.read()
    sequence_data.append(sequence)

  # Close the sequence handle
  sequence_handle.close()
  return sequence_data

""" liste1 = [1, 2, 3]
liste2 = ['a', 'b', 'c']
resultat = zip(liste1, liste2)
print(dict(resultat))


sed ={}
for element1, element2 in zip(liste1, liste2):
    sed[element1] = element2
print(str(list(sed.values()))) """

from datetime import datetime

# Example with the standard date and time format
date_str = "Sun Oct-20-2024"
date_format = '%a %b-%d-%Y' 

date_obj = datetime.strptime(date_str, date_format)
print(date_obj)

# # Example with a different format

# date_str = '02/28/2023 02:30 PM'
# date_format = '%m/%d/%Y %I:%M %p'

# date_obj = datetime.strptime(date_str, date_format)
# print(date_obj)

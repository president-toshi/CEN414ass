animals = ["dog", "cat", "elephant", "zebra", "bee", "fish", "dolphin"]
sorted_animals = []

for i in range(len(animals)):
    if i == 0:
        sorted_animals.append(animals[i])
    else:
        for j in range(len(sorted_animals)):
            if animals[i] < sorted_animals[j]:
                sorted_animals.insert(j, animals[i])
                break
            elif j == len(sorted_animals) - 1:
                sorted_animals.append(animals[i])

print(sorted_animals)

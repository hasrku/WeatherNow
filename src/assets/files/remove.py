import json
import unicodedata

# Specify the JSON file
json_file = "city-list.json"

# Function to remove diacritical marks (accents) from characters
def remove_special_characters(text):
    return ''.join(
        (c if unicodedata.category(c) != 'Mn' else '') for c in unicodedata.normalize('NFD', text)
    )

try:
    # Load JSON data with UTF-8 encoding
    with open(json_file, "r", encoding="utf-8") as file:
        data = json.load(file)

    # Replace special characters in place names
    for item in data:
        if isinstance(item, dict) and "name" in item:
            item["name"] = remove_special_characters(item["name"])

    # Save the updated JSON with UTF-8 encoding
    with open(json_file, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

    print(f"✅ Replaced special characters in place names.")

except FileNotFoundError:
    print("❌ Error: JSON file not found!")
except json.JSONDecodeError:
    print("❌ Error: Invalid JSON format!")
except Exception as e:
    print(f"❌ An unexpected error occurred: {e}")

import csv
import json

def parse_csv():
    contacts = []
    
    with open('police_contacts.csv', 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.reader(f)
        header = next(reader)
        
        for row in reader:
            if len(row) < 6:
                continue
            
            sno = row[0].strip()
            district = row[1].strip()
            office_type = row[2].strip()
            office_name = row[3].strip()
            email = row[4].strip()
            
            # Sometimes phone is in the 5th index, sometimes split into next if there were extra commas
            phone = row[5].strip()
            
            if not phone and len(row) > 6:
                phone = row[6].strip()
            
            # Clean up quotes or newlines in phone/email
            phone = phone.replace('"', '').replace('\n', ' ').strip()
            email = email.replace('"', '').replace('\n', ' ').strip()
            
            if not district or not phone:
                continue
                
            # Create a clean display name
            name = f"{district} - {office_name}" if office_name else district
            
            contacts.append({
                "name": name,
                "role": "Police Station / Office",
                "phone": phone,
                "email": email,
                "category": "stations"
            })
            
    # Write to JS file
    js_content = "export const policeStationsData = " + json.dumps(contacts, indent=2) + ";\n"
    
    with open('components/contacts_data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Successfully generated contacts_data.js with {len(contacts)} records.")

if __name__ == '__main__':
    parse_csv()

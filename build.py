import os

# Define the file structure
file_structure = {
    "package.json": "",
    "index.js": "",
    "config.js": "",
    "src": {
        "models": {
            "Client.js": "",
            "Device.js": ""
        },
        "controllers": {
            "deviceController.js": "",
            "messageController.js": ""
        },
        "routes": {
            "deviceRoutes.js": "",
            "messageRoutes.js": ""
        },
        "services": {
            "clientService.js": "",
            "qrService.js": ""
        },
        "middleware": {
            "logger.js": ""
        },
        "utils": {
            "logger.js": ""
        }
    },
    "public": {
        "qr-scanner.html": "",
        "js": {
            "qr-scanner.js": ""
        },
        "css": {
            "style.css": ""
        }
    }
}

# Function to create the folder and files
def create_structure(base_path, structure):
    for name, value in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(value, dict):
            os.makedirs(path, exist_ok=True)  # Create folder if it's a directory
            create_structure(path, value)  # Recurse into subdirectory
        else:
            # Create an empty file
            with open(path, "w") as file:
                file.write(value)

# Create the structure starting from the current directory
create_structure(".", file_structure)

print("File structure created successfully.")

# Initialize the app package
import logging

# Setup logging for the app package
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

# Optional: Package-level constants or imports
APP_NAME = "YADI AI Customer Support Workspace"
VERSION = "1.0.0"

logging.info(f"{APP_NAME} initialized, version {VERSION}")

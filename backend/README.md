# Ally Langchain Agent Collaborator

This repository contains an agent collaborator built with Langchain. The project involves setting up an environment, installing dependencies, and running the agent.

## Set Up (Optional)

To get started, you can set up a virtual environment to manage dependencies. Follow the steps below to initialize and activate the environment:

### Initialize the Environment

Run the following command to create a virtual environment:

```bash
python -m venv "venv"
```

### Activate the Environment

Activate the virtual environment using the appropriate command for your operating system:

- On Windows:
  ```bash
  venv\Scripts\activate
  ```

- On macOS and Linux:
  ```bash
  source venv/bin/activate
  ```

## Install Requirements

To install the necessary dependencies, run the following command:

```bash
pip install -r requirements.txt
```

Make sure you have a `requirements.txt` file in your project directory with all the required packages listed.

## Running the Agent

Create a .env file and create a variable as follows:
```
OPENAI_API_KEY='your api key'
```

To interact with the agent, we have built an a very simple API. Run it using the following command

```
python3 server.py
```
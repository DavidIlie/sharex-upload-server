## Setup

Before anything, make sure to configure your `config.yml` to your needs! If you don't configure it correctly, it might not work once deployed!

1. [Install Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html). The easiest way is via Pip:
    1. (If on Debian): `sudo apt-get install -y python3-pip`
    2. (Everywhere): `pip3 install ansible`
2. Clone this repository: `git clone https://github.com/davidilie/sharex-upload-server.git`, then enter the repository directory: `cd sharex-upload-server.`.
3. Install requirements: `ansible-galaxy collection install -r requirements.yml` (if you see `ansible-galaxy: command not found`, restart your SSH session or reboot the server and try again)
4. Make copies of the following files and customize them to your liking:
    - `example.inventory.ini` to `inventory.ini` (replace IP address with your server's IP, or comment that line and uncomment the `connection=local` line if you're running it on the same system you're setting up).
    - `example.config.yml` to `config.yml`
5. Run the playbook: `ansible-playbook main.yml --become --ask-become-pass` and enter your root password.

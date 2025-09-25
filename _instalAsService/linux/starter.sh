#!/bin/bash
echo -e '\033[1;92m'
echo The page can be accessed here:
echo -e '\033[1;32m'
ifconfig eth0 | grep "inet addr" | cut -d ':' -f 2 | cut -d ' ' -f 1
echo -e '\033[0m'
echo
echo
echo
sudo python3 self_help.py
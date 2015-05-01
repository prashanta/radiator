SETTING UP DISPLAY
==================

1. Get a Raspberry Pi (Version 2 perferred or overclock Version 1)
2. Install latest Raspbian
3. Install Chromium, x11-server-util, unclutter
4. Setup wireless access points in /etc/wpa_supplicant/wpa_supplicant.conf (Make sure IP is fixed by DHCP based on MAC address)
6. Enable SSH
7. Autostart Chromium and point to Radiator
8. Fix monitor resolution - use tvservice command. Start with the resolution with highest score and move down.
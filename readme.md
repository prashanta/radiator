**Radiator** is a SPA that displays manufacturing matrices in the form of dashboard items. Based on Marionette.js, this basically retrieves information from ERP database and displays them on various screen sizes.
* * *

#### SETUP RASPBERRY PI:

##### Initial Setting
```
sudo raspi-config
```

- Expand file system
- Enable boot to desktop
- Change timezone
- Enable SSH

##### Setup Keyboard
```
sudo nano /etc/default/keyboard --> change from gb to us
sudo dpkg-reconfigure locales --> select en_US UTF8
sudo reboot
```

##### Setup Wifi

```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

Add -

```
network = {
    ssid="GEMT-NBS"
    psk="G@mt2015#"
    key_mgmt=WPA-PSK
}

network = {
    ssid="GEMT-SHPTV"
    psk="G@mt2015#"
    key_mgmt=WPA-PSK
}
```
##### Setup Chromium, X11 Server Utility and Unclutter
```
sudo apt-get install chromium x11-xserver-utils unclutter
```

##### Setup Startup
```
 sudo nano /etc/xdg/lxsession/LXDE-pi
```
Add

```
#@xscreensaver -no-splash
@xset s off
@xset -dpms
@xset s noblank

@lxterminal -e "python /home/pi/starter.py"
```

##### Setup Screen Resulation
To view available display modes
```
tvservice -d edid
edidparser edid
```

Change display mode:
```
sudo nano /boot/config.txt
```

Uncomment to force HDMI mode and group:
```
hdmi_group=1
hdmi_mode=34
```

Then reboot,
```
sudo reboot
```
* * *
### RELEASE NOTES:

#### Version 0.2:
- Formalized display hierarchy.
- Refactored basic view structures.
- Added better selection controls in Models and global.js to choose between different development modes - File/Dev server/Production server

* * *

### SETTING UP RASPBERRY PI

1. Get a Raspberry Pi (Version 2 perferred or overclock Version 1)
2. Install latest Raspbian
3. Install _Chromium_, _x11-server-util_ and _unclutter_ :
   ```sudo apt-get install chromium x11-server-util unclutter```
4. Setup wireless access points in /etc/wpa_supplicant/wpa_supplicant.conf (Make sure IP is fixed by DHCP based on MAC address)
6. Enable SSH
7. Autostart python script - starter.py
8. Fix monitor resolution - use tvservice command. Start with the resolution with highest score and move down.
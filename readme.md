**Radiator** is a SPA that displays manufacturing matrices in the form of dashboard items. Based on Marionette.js, this basically retrieves information from ERP database and displays them on various screen sizes.
* * *

#### SETUP RASPBERRY PI:

##### Initial Setting

- Install **latest** RASPBIAN (kernel verison >= 3.18.11-v7)

```
sudo raspi-config
```

- Expand file system
- Enable boot to desktop
- Change timezone
- Enable SSH
* * *
##### Setup Keyboard
```
sudo nano /etc/default/keyboard --> change from gb to us
sudo dpkg-reconfigure locales --> select en_US UTF8
sudo reboot
```
* * *
##### Change Hostname
```
sudo nano /etc/hostname --> change hostname
sudo reboot
```
* * *
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

Then reboot,
```
sudo reboot
```
* * *
##### Setup Chromium, X11 Server Utility and Unclutter
```
sudo apt-get install chromium x11-xserver-utils unclutter
```
* * *
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
* * *
##### Setup Screen Resolution
To view available display modes
```
tvservice -d edid
edidparser edid
```

Change display mode:
```
sudo nano /boot/config.txt
```

Uncomment to force HDMI mode and group (CEA:1, DMT: 2):
```
hdmi_group=1
hdmi_mode=34
```

Then reboot,
```
sudo reboot
```
* * *
##### Setup VNC Server
```
sudo apt-get install x11vnc
x11vnc -display :0
```
* * *
##### Setup Static IP for Ehternet
```
sudo cp /etc/network/interfaces /etc/network/interfaces.bkup
sudo nano /etc/network/interfaces
```
Comment out DHCP setting if enabled:
```
#iface eth0 inet dhcp
```

Setup static lan:
```
# The loopback interface
auto lo
iface lo inet loopback
auto eth0
iface eth0 inet static
address 192.168.1.118  
gateway 192.168.1.254
netmask 255.255.255.0
network 192.168.1.0
broadcast 192.168.1.255
```

Restart network
```
sudo /etc/init.d/networking restart
```
* * *
### RELEASE NOTES:

#### Version 0.2:
- Formalized display hierarchy.
- Refactored basic view structures.
- Added better selection controls in Models and global.js to choose between different development modes - File/Dev server/Production server

* * *

### IP TABLE

|Cell|IP Address|MAC Address|Target URL|
|----|-----------|-----------|-----------|
|Band Saw|192.168.74.202|74:DA:38:33:A6:E4|http://192.168.74.250/radiator/#101|
|Andover|192.168.74.201|00:E0:4D:86:7B:30|http://192.168.74.110/andover|
|VF2|192.168.74.203|74:DA:38:33:A6:FB|http://192.168.74.110/VF2|
|SMM|192.168.74.204|74:DA:38:33:A6:E9|http://192.168.74.110/SMM|
|Hurco|192.168.74.205|74:DA:38:33:A6:DF|http://192.168.74.110/Hurco|
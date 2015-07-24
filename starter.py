#!/usr/bin/env python
import urllib2      # for connection_on()
import subprocess
import shlex        # to split commands for subprocess
import os
import signal       # for kill signal
import time
from time import gmtime, strftime
import threading

def main():
    count = 0
    chrome = 'google-chrome'

    # setup
    # run('')

    # kill('chrome')
    # # print('kill')#
    # print('Starting Chrome')
    # open(chrome)

    while(1):
        while(not(connected())):
            count += 1
            print('> Network disconnected, waiting...' + strftime("%Y-%m-%d %H:%M:%S", gmtime()))
            if( isRunning() and count > 20):
                kill()
                run('reboot')
                
            time.sleep(5)

        if ( not(isRunning()) and connected()):
            count = 0
            print('> Starting Chrome...')
            open(url='http://192.168.74.250/radiator/index.html#101')

        # print(isRunning('chrome'))
        print('> Sleeping ... ' + strftime("%Y-%m-%d %H:%M:%S", gmtime()))
        time.sleep(35)

    kill()

def isRunning(app='chromium'):
    try:
        # get a snapshot of current processes
        proc1 = subprocess.Popen(['ps', '-A'], stdout=subprocess.PIPE)

        # filter and get processes of app
        proc2 = subprocess.Popen(['grep', app], stdin=proc1.stdout, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        proc1.stdout.close()

        out, err = proc2.communicate()
        lines = out.splitlines()
        if len(lines) == 0:
            return False
        else:
            return True

    except subprocess.CalledProcessError as e:
        print e.output

def open(app = 'chromium', param= '--kiosk', url ='www.google.com'):
    print '> loading ' + app

    class AppThread(threading.Thread):
        def __init__(self, app, param, url):
            threading.Thread.__init__(self)
            self.app = app
            self.param = param
            self.url = url

        def run(self):
            try:
                proc = subprocess.Popen([self.app, self.param, '--incognito', self.url], stdout=subprocess.PIPE)

                out, err = proc.communicate()
                # print ('opened: ' + self.app)

                proc.stdout.close()
                if err:
                    print err

            except subprocess.CalledProcessError as e:
                print e.output

            # if command not found
            except OSError as error:
                print ('> open():: error file not found')

    thread = AppThread(app, param, url)
    thread.start()



# kill an app
def kill(app='chromium'):
    try:
        # get a snapshot of current processes
        proc1 = subprocess.Popen(['ps', '-A'], stdout=subprocess.PIPE)

        # filter and get processes of app
        proc2 = subprocess.Popen(['grep', app], stdin=proc1.stdout, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        proc1.stdout.close()

        out, err = proc2.communicate()
        lines = out.splitlines()
        if len(lines) == 0:
            # print 'kill():: app not found!'
            return

        for line in out.splitlines():
            PID = int(line.split(None, 1)[0])   # split PID
            print "> kill():: killing process: " + str(PID)
            os.kill(PID, signal.SIGKILL)        # send kill signal to PID

    except subprocess.CalledProcessError as e:
        print e.output
    except OSError as e:
        print e.output

def run(command = 'ls -l'):
    try:
        proc = subprocess.Popen(['sudo', '-S']+ shlex.split(command), stdout=subprocess.PIPE)
        out, err = proc.communicate()

    except subprocess.CalledProcessError as e:
        print e.output

    except OSError as e:
        print e.output

# # checking if network is connected using URL CONNECTION
# # import urllib2
# def is_connected(url = 'http://103.21.25.123', timeout = 1):
#     try:
#         response=urllib2.urlopen(url,timeout = timeout)
#         return True
#     except urllib2.URLError as err: pass
#     return False

# checking if network is connected using PING
# works with URL too, but use IP address for faster response
def connected(ip = '192.168.74.250', count = 1):
    try:
        proc = subprocess.Popen(['ping', '-c', str(count), ip], stdout=subprocess.PIPE)
        out, err = proc.communicate()
        if proc.returncode == 0:
            return True
        elif proc.returncode > 0:
            # print('is_connected():: return code: ' + str(proc.returncode))
            return False

    except subprocess.CalledProcessError as e:
        print e.output
        return False


if __name__ == '__main__':
    print ('> Welcome!! <')
    main()

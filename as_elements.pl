#!/usr/bin/perl -w

use strict;
use bytes;

print "<p id=\"leveldata\">";

undef $/;

while(<>) {
  my @a = split //;
  foreach(@a) {
    print "&#", ord, ";";
  }
}

print "</p>\n";

#!/usr/bin/perl -w

use Image::Magick;
use strict;

$| = 1;

if (@ARGV < 2) {
  print "Usage: $0 tiles.png tile_size\nImages will be written to current directory.\n";
  exit;
}


my $in = $ARGV[0];
my $size = $ARGV[1];
my $img = Image::Magick->new;

my $err = $img->Read($in);
die "$err" if $err;

my $w = $img->Get('width');
my $h = $img->Get('height');

if ($w % $size != 0) {
  die "Width of image ($w) is not a multiple of $size";
}
if ($h % $size != 0) {
  die "Height of image ($h) is not a multiple of $size";
}


my $tiles_across = $w / $size;
my $tiles_down = $h / $size;

print "Making ${size}x${size} tiles, $tiles_across across and $tiles_down down\n";

my ($i, $j);
for ($j = 0; $j < $tiles_down; $j++) {
  for ($i = 0; $i < $tiles_across; $i++) {
    my $img2 = $img->Clone();
    
  }
}


print "done\n";

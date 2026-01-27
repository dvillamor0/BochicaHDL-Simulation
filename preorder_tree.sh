#!/usr/bin/env bash

preorder() {
  local dir="$1"
  local prefix="$2"

  echo "${prefix}📁 $dir/"


  for d in "$dir"/*/; do
    [ -d "$d" ] || continue
    preorder "$d" "  $prefix"
  done


  for f in "$dir"/*; do
    [ -f "$f" ] || continue
    echo "${prefix}  📄 $(basename "$f")"
    echo "${prefix}  ──────"
    sed "s/^/${prefix}  | /" "$f"
    echo "${prefix}  ──────"
  done
}

preorder "${1:-.}" ""

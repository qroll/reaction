for i in $(seq 1 2); do
  if [[ $i -gt 1 ]]; then
    sleep 15
    echo
    echo "===== Command failed, retrying..."
    echo
  fi
  npm run test:nightwatch
  if [ $? -eq 0 ]; then
    break
  fi
done
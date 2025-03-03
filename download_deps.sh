ARCH="$(uname -m)"

ci_url="https://s3.amazonaws.com/spec.ccfc.min/firecracker-ci/v1.9"
release_url="https://github.com/firecracker-microvm/firecracker/releases"
latest=$(basename $(curl -fsSLI -o /dev/null -w  %{url_effective} ${release_url}/latest))

mkdir -p deps

[ -e deps/vmlinux-5.10.217.bin ] || wget ${ci_url}/${ARCH}/vmlinux-5.10.217 -O deps/vmlinux-5.10.217.bin
[ -e deps/ubuntu-22.04.ext4 ] || wget ${ci_url}/${ARCH}/ubuntu-22.04.ext4 -O deps/ubuntu-22.04.ext4
[ -e deps/ubuntu-22.04.id_rsa ] || wget ${ci_url}/${ARCH}/ubuntu-22.04.id_rsa -O deps/ubuntu-22.04.id_rsa
[ -e deps/firecracker.tgz ] || wget ${release_url}/download/${latest}/firecracker-${latest}-${ARCH}.tgz -O deps/firecracker.tgz

chmod 400 deps/ubuntu-22.04.id_rsa
tar -xzf deps/firecracker.tgz -C deps

mv deps/release-${latest}-$(uname -m) deps/firecracker
mv deps/firecracker/firecracker-${latest}-${ARCH} deps/firecracker/firecracker

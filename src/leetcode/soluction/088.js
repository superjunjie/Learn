function merge(nums1, m, nums2, n) {
    let len = m + n
    while(m > 0 && n > 0) {
        nums1[--len] = nums2[n - 1] > nums1[m - 1] ? nums2[--n] : nums1[--m]
    }
    if(n > 0) {
        nums1.splice(0, n, ...nums2.slice(0, n))
    }
}

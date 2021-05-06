function rotate(matrix) {
    let N = matrix.length
    let imax = Math.floor(N/2)
    let jmax = Math.floor((N+1)/2)
    for(i = 0; i < imax; i++) {
        for(j = 0; j < jmax; j++) {
            [matrix[i][j], matrix[N-1-j][i], matrix[N-1-i][N-1-j], matrix[j][N-1-i]] = [matrix[N-1-j][i], matrix[N-1-i][N-1-j], matrix[j][N-1-i],matrix[i][j]]
        }
    }
}

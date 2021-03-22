/**
 * Typechecked animation combinator helper.
 * Animation progress must match on both objects.
 * @returns combined styles for each animation step
 */
export const mergeAnimations = <A extends { [key in keyof B]: any }, B extends { [key in keyof A]: any }>(
    a: A,
    b: B,
): any => {
    return Object.keys(a).map(prop => {
        if (b.hasOwnProperty(prop)) {
            return { ...(a as any)[prop], ...(b as any)[prop] };
        } else {
            return a;
        }
    });
};
